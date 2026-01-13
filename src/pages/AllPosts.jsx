import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/project_config";
import Container from "../components/container/Container";
import { PostCard } from "../components";
import { useSelector } from "react-redux";
const AllPosts = ({ authentication }) => {
    console.log(authentication);

    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        appwriteService.getAllPosts().then((posts) => {
            if (posts) {
                setPosts(posts.rows);
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {userData
                                    ? "No Posts to View"
                                    : "Login to read posts"}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap justify-center">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-75">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default AllPosts;
