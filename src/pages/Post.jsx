import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/project_config";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
const Post = () => {
    const [post, setPost] = useState(null);
    const [postImgURL, setPostImgURL] = useState(null);

    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    // useEffect(() => {
    //     if (!String(featuredImage).startsWith("http")) {
    //         appwriteService.getFile(featuredImage).then((res) => {
    //             setImgURL(res);
    //         });
    //     }
    // }, [featuredImage]);
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    const { featuredImage } = post;
                    if (featuredImage.startsWith("http")) {
                        setPostImgURL(featuredImage);
                    } else {
                        appwriteService.getFile(featuredImage).then((res) => {
                            setPostImgURL(res);
                        });
                    }
                } else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate, userData]);

    const deletePost = async () => {
        await appwriteService.deletePost(post.$id);
        const idr = await appwriteService.deleteFile(post.featuredImage);

        if (idr) {
            navigate("/");
        }
    };

    const editPost = (id) => {
        navigate(`/edit-post/${id}`);
    };

    return post ? (
        <div className="mt-10">
            <Container className="p">
                <div className="w-full flex flex-col border justify-center mb-4 rounded-xl min-h-50 p-5 shadow-lg">
                    <img
                        src={postImgURL}
                        alt={post.title}
                        className="rounded-xl m-5 mb-1 ring ring-gray-500"
                    />
                    <div className="relative">
                        {isAuthor && (
                            <div className="absolute right-6 top-3 space-x-3">
                                <Button
                                    title={
                                        <>
                                            <svg
                                                width="20px"
                                                height="20px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4 21h4.586L19.293 10.293a1 1 0 0 0 0-1.414l-4.172-4.172a1 1 0 0 0-1.414 0L4 15.586V21zM14.121 5.464l4.243 4.243"
                                                    stroke="#000000"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </>
                                    }
                                    className="px-2 py-1"
                                    onClick={() => editPost(post.$id)}
                                />
                                <Button
                                    title={
                                        <>
                                            <svg
                                                width="20px"
                                                height="20px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                                                    stroke="#000000"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </>
                                    }
                                    className="px-2 py-1"
                                    onClick={deletePost}
                                />
                            </div>
                        )}
                    </div>
                    <div className="w-full px-7 pl-10 pt-5">
                        <h1 className="text-4xl font-bold py-4">
                            {post.title}
                        </h1>
                        <hr />
                        <p className="pb-4">Description: </p>
                        <div className="prose whitespace-pre-wrap">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
};

export default Post;
