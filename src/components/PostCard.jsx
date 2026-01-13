import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/project_config";
import { Link } from "react-router-dom";
const PostCard = ({ $id, title, featuredImage }) => {
    const [imgURL, setImgURL] = useState(() =>
        String(featuredImage).startsWith("http") ? featuredImage : null
    );

    useEffect(() => {
        if (!String(featuredImage).startsWith("http")) {
            appwriteService.getFile(featuredImage).then((res) => {
                setImgURL(res);
            });
        }
    }, [featuredImage]);

    return (
        <Link to={`/post/${$id}`}>
            <div className="rounded-xl p-4 border h-70">
                <div className="w-full mb-4 justify-center">
                    <img
                        src={imgURL}
                        alt=""
                        className="rounded-xl border aspect-video"
                    />
                </div>
                <hr />
                <h2 className="text-lg font-semibold text-center">{title}</h2>
            </div>
        </Link>
    );
};

export default PostCard;
