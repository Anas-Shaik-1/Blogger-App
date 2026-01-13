import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Error, Input, Select } from "..";
import appwriteService from "../../appwrite/project_config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TextInput from "../TextInput";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const [imgURL, setImgURL] = useState(null);

    const title = watch("title");

    if (post) {
        appwriteService
            .getFile(post.featuredImage)
            .then((res) => setImgURL(res))
            .catch(() => setImgURL(null));
    }

    const submit = async (data) => {
        if (post) {
            const file = data.image[0]
                ? await appwriteService.uploadFile(data.image[0])
                : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                try {
                    console.log("User Data", userData);

                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id,
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                } catch (error) {
                    console.log("catching");
                    console.log("Posts creation Failed:", error);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        return (
            value
                ?.toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "") || ""
        );
    }, []);

    React.useEffect(() => {
        setValue("slug", slugTransform(title), {
            shouldValidate: true,
        });
    }, [title, slugTransform, setValue]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-wrap relative"
        >
            {/* {error ? <Error /> : null} */}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                    readOnly
                />

                <TextInput {...register("content", { required: true })} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img src={imgURL} className="rounded-lg" />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    title="Submit"
                    type="submit"
                    className="w-full py-2 bg-[#364153] text-gray-50 hover:bg-[#1e2939] hover:text-white"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
