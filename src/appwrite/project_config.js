import { Client, ID, Storage, Query, TablesDB } from "appwrite";
import config from "../config/config";

export class Service {
    client = new Client();

    tablesDB;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);

        this.tablesDB = new TablesDB(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.tablesDB.createRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: slug,
                data: { title, content, featuredImage, status, userId },
            });
        } catch (error) {
            console.log("Appwrite service :: createPost :: error");
            // console.log("Appwrite service :: createPost :: error", error);
            throw new Error(error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: slug,
                data: { title, content, featuredImage, status }, // optional
            });
        } catch (error) {
            // console.log("Appwrite service :: updatePost :: error", error);
            console.log("Appwrite service :: updatePost :: error");
        }
    }

    async deletePost(slug) {
        try {
            await this.tablesDB.deleteRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: slug,
            });
            return true;
        } catch (error) {
            // console.log("Appwrite service :: deletePost :: error", error);
            console.log("Appwrite service :: deletePost :: error");
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.tablesDB.getRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: slug,
            });
        } catch (error) {
            // console.log("Appwrite service :: getPost :: error", error);
            console.log("Appwrite service :: getPost :: error");
            return false;
        }
    }

    async getAllPosts(
        queries = [
            Query.equal("status", "active"),
            Query.orderDesc("$updatedAt"),
            Query.limit(9),
        ]
    ) {
        try {
            return await this.tablesDB.listRows({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                queries,
            });
        } catch (error) {
            console.log("Appwrite service :: getAllPosts :: error");
            // console.log("Appwrite service :: getAllPosts :: error", error);
            return null;
        }
    }

    // File Upload Services
    async uploadFile(file) {
        try {
            return await this.storage.createFile({
                bucketId: config.appwriteBucketId,
                fileId: ID.unique(),
                // file: document.getElementById("uploader").files[0],
                file,
            });
        } catch (error) {
            console.log("Appwrite service :: uploadFIle :: error");
            // console.log("Appwrite service :: uploadFIle :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile({
                bucketId: config.appwriteBucketId,
                fileId,
            });
            return true;
        } catch (error) {
            // console.log("Appwrite service :: deleteFIle :: error", error);
            console.log("Appwrite service :: deleteFIle :: error");
            return false;
        }
    }

    async getFilePreview(fileId) {
        return await this.storage.getFilePreview({
            bucketId: config.appwriteBucketId,
            fileId,
        });
    }
    async getFile(fileId) {
        return await this.storage.getFileView({
            bucketId: config.appwriteBucketId,
            fileId,
        });
    }
}

const service = new Service();

export default service;
