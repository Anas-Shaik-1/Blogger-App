const TextInput = ({ ...props }) => {
    return (
        <div className="w-full">
            <div className="w-full my-1 relative">
                <label
                    htmlFor="post-content"
                    className="ps-1 text-sm font-semibold"
                >
                    Post content :
                </label>

                <textarea
                    autoComplete="off"
                    id="post-content"
                    className={`px-3 py-1 rounded-md bg-white text-black font-sm placeholder:font-xs 
                    focus:ring-1 outline-none  
                    focus:ring-gray-500 
                    focus:bg-gray-50
                     border border-gray-200 w-full resize-none h-50`}
                    {...props}
                />
            </div>
        </div>
    );
};

// <Editor
//     initialValue={defaultValue}
//     apiKey="d2onhgrfi7u3u2xbbsxcelz6sttkzisf7ircxlr67m1nv2tt"
//     init={{
//         initialValue: defaultValue,
//         height: 400,
//         menubar: true,
//         plugins: [],
//         toolbar: "",
//         contentStyle: "body {}",
//     }}
//     onEditorChange={onChange}
// />

export default TextInput;
