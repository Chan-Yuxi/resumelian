import { useEffect, useRef } from "react";
import { upload } from "@/api/upload";

const Upload = () => {
  const file = useRef<HTMLInputElement>(null);

  useEffect(() => {
    file.current &&
      file.current.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        if (target && target.files!.length > 0) {
          const file = target.files![0];

          const fd = new FormData();
          fd.append("file", file);
          upload("Wx_077013a2237a426fae583bb1c", fd).then((data) => {
            if (data) {
              console.log(data);
            }
          });
        }
      });
  });

  return (
    <>
    <input type="file" ref={file} />
    <img src="http://48s6hn.natappfree.cc/home/2?userId=Wx_077013a2237a426fae583bb1c" alt="" />
    </>
  );
};

export default Upload;
