import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import styles from "./quil.module.scss";
import api from "../../../services/api";
import { IMAGE_URL } from "../../../config";
import useToast from "../../../hooks/useToast";
import 'react-quill/dist/quill.snow.css';

const BlockEmbed = ReactQuill.Quill.import("blots/block/embed");

class ImageLoaderBlot extends BlockEmbed {
  static create(value: { src: string; id: string }) {
    const node = super.create();
    node.setAttribute("data-loader-id", value.id);
    node.setAttribute("class", "image-loader");

    node.innerHTML = `
      <div style="position: relative; display: inline-block;">
        <img src="${value.src}" alt="loading" style="filter: blur(10px); opacity: 0.5; width: 100%; height: auto;" />
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 18px;
          color: white;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        ">
         Uploading your image ...
        </div>
      </div>
    `;
    return node;
  }

  static value(node: HTMLElement) {
    return {
      src: node.querySelector("img")?.getAttribute("src") || "",
      id: node.getAttribute("data-loader-id") || "",
    };
  }
}

ImageLoaderBlot.blotName = "imageLoader";
ImageLoaderBlot.tagName = "div";
ReactQuill.Quill.register(ImageLoaderBlot);

var icons = ReactQuill.Quill.import("ui/icons");
icons[
  "bold"
] = `<svg class="QuilCustomIcon" width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.429 12.2721C16.2725 11.7584 16.9844 11.0548 17.5079 10.2172C18.0313 9.37971 18.3519 8.43147 18.444 7.4481C18.4599 6.55891 18.3006 5.67527 17.975 4.84767C17.6494 4.02006 17.164 3.26471 16.5464 2.62475C15.9289 1.98479 15.1913 1.47276 14.3758 1.11791C13.5603 0.763058 12.6829 0.572338 11.7937 0.556641H0.612305V24.6768H12.6724C13.5186 24.6678 14.3547 24.4922 15.133 24.16C15.9113 23.8278 16.6166 23.3456 17.2085 22.7409C17.8005 22.1361 18.2675 21.4207 18.583 20.6355C18.8984 19.8502 19.0561 19.0105 19.047 18.1643V17.9576C19.0476 16.7638 18.7074 15.5947 18.0665 14.5876C17.4256 13.5805 16.5106 12.7772 15.429 12.2721V12.2721ZM4.05804 4.00237H11.2941C12.0283 3.97965 12.7519 4.18204 13.3678 4.58238C13.9838 4.98272 14.4625 5.56187 14.7398 6.2421C15.0204 7.1514 14.9297 8.13482 14.4874 8.97741C14.0451 9.82001 13.2873 10.4533 12.3795 10.7388C12.027 10.8421 11.6614 10.8943 11.2941 10.8938H4.05804V4.00237ZM11.9832 21.231H4.05804V14.3396H11.9832C12.7175 14.3168 13.4411 14.5192 14.057 14.9196C14.6729 15.3199 15.1516 15.8991 15.429 16.5793C15.7096 17.4886 15.6188 18.472 15.1765 19.3146C14.7342 20.1572 13.9764 20.7905 13.0686 21.076C12.7161 21.1793 12.3506 21.2315 11.9832 21.231V21.231Z" fill="#A1A19C"/>
</svg>
`;
icons[
  "italic"
] = `<svg class="QuilCustomIcon" width="9" height="25" viewBox="0 0 9 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.94363 7.4481H7.38936L3.59905 24.6768H0.15332L3.94363 7.4481ZM6.83804 0.556641C6.49729 0.556641 6.16419 0.657685 5.88087 0.846996C5.59754 1.03631 5.37672 1.30538 5.24632 1.62019C5.11592 1.93501 5.0818 2.28142 5.14828 2.61562C5.21476 2.94982 5.37884 3.25681 5.61979 3.49776C5.86074 3.7387 6.16772 3.90279 6.50192 3.96927C6.83613 4.03575 7.18254 4.00163 7.49735 3.87123C7.81216 3.74083 8.08124 3.52 8.27055 3.23668C8.45986 2.95336 8.56091 2.62026 8.56091 2.27951C8.56091 1.82257 8.37939 1.38436 8.05629 1.06126C7.73319 0.738157 7.29497 0.556641 6.83804 0.556641Z" fill="#A1A19C"/>
</svg>
`;

icons[
  "underline"
] = `<svg class="QuilCustomIcon" width="42" height="43" viewBox="0 0 42 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32.9463 35.3996V38.8454H8.82617V35.3996H32.9463ZM27.7777 23.71C27.721 24.8471 27.3834 25.9524 26.7952 26.9271C26.207 27.9019 25.3865 28.7157 24.4069 29.2959C23.4274 29.8761 22.3194 30.2046 21.1819 30.2521C20.0444 30.2995 18.9129 30.0644 17.8884 29.5677C16.7077 29.0569 15.7063 28.2052 15.0126 27.1217C14.3189 26.0381 13.9645 24.7722 13.9948 23.486V9.56526H10.549V23.71C10.6073 25.3319 11.0467 26.9173 11.8316 28.3379C12.6164 29.7584 13.7248 30.9742 15.0669 31.8868C16.4089 32.7994 17.947 33.3832 19.5567 33.5909C21.1663 33.7986 22.8022 33.6244 24.332 33.0824C26.3669 32.4041 28.1324 31.0945 29.3717 29.3438C30.6111 27.5932 31.2598 25.4928 31.2234 23.3482V9.56526H27.7777V23.71ZM27.7777 9.55664H31.2234H27.7777ZM13.9948 9.55664H10.549H13.9948Z" fill="#A1A19C"/>
</svg>
`;
icons[
  "color"
] = `<svg class="QuilCustomIcon" width="33" height="33" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.0861 33.6768H27.5318L18.9175 9.55664H15.4718L6.85742 33.6768H10.3032L12.7152 26.7853H21.5018L24.0861 33.6768ZM13.9212 23.3396L17.1946 14.3807L20.4681 23.3396H13.9212ZM35.9739 31.0925C35.9739 31.6036 35.8223 32.1032 35.5383 32.5282C35.2544 32.9532 34.8507 33.2844 34.3785 33.48C33.9063 33.6756 33.3867 33.7268 32.8854 33.6271C32.3841 33.5274 31.9236 33.2813 31.5622 32.9198C31.2008 32.5584 30.9546 32.0979 30.8549 31.5966C30.7552 31.0953 30.8064 30.5757 31.002 30.1035C31.1976 29.6313 31.5288 29.2277 31.9538 28.9437C32.3788 28.6597 32.8784 28.5082 33.3896 28.5082C34.075 28.5082 34.7323 28.7804 35.2169 29.2651C35.7016 29.7497 35.9739 30.4071 35.9739 31.0925ZM35.9739 24.201C35.9739 24.7121 35.8223 25.2118 35.5383 25.6368C35.2544 26.0617 34.8507 26.393 34.3785 26.5886C33.9063 26.7842 33.3867 26.8354 32.8854 26.7356C32.3841 26.6359 31.9236 26.3898 31.5622 26.0284C31.2008 25.667 30.9546 25.2065 30.8549 24.7052C30.7552 24.2039 30.8064 23.6843 31.002 23.212C31.1976 22.7398 31.5288 22.3362 31.9538 22.0522C32.3788 21.7683 32.8784 21.6167 33.3896 21.6167C34.075 21.6167 34.7323 21.889 35.2169 22.3736C35.7016 22.8583 35.9739 23.5156 35.9739 24.201ZM35.9739 17.3095C35.9739 17.8207 35.8223 18.3203 35.5383 18.7453C35.2544 19.1703 34.8507 19.5015 34.3785 19.6971C33.9063 19.8927 33.3867 19.9439 32.8854 19.8442C32.3841 19.7445 31.9236 19.4983 31.5622 19.1369C31.2008 18.7755 30.9546 18.315 30.8549 17.8137C30.7552 17.3124 30.8064 16.7928 31.002 16.3206C31.1976 15.8484 31.5288 15.4447 31.9538 15.1608C32.3788 14.8768 32.8784 14.7252 33.3896 14.7252C34.075 14.7252 34.7323 14.9975 35.2169 15.4822C35.7016 15.9668 35.9739 16.6241 35.9739 17.3095Z" fill="#A1A19C"/>
</svg>
`;

icons["image"] = `
  <svg class="QuilCustomIcon"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 485 485" xml:space="preserve">
<g fill="rgb(161, 161, 156)"> 
	<polygon points="30,30 106,30 106,0 0,0 0,106 30,106  "/>
	<polygon points="379,0 379,30 455,30 455,106 485,106 485,0  "/>
	<polygon points="455,455 379,455 379,485 485,485 485,379 455,379  "/>
	<polygon points="30,379 0,379 0,485 106,485 106,455 30,455  "/>
	<path d="M274.405,175c26.191,0,47.5-21.309,47.5-47.5S300.597,80,274.405,80s-47.5,21.309-47.5,47.5S248.214,175,274.405,175z"/>
	<polygon points="80,405 405,405 405,308.18 346.358,246.304 275.241,287.672 176.238,216.922 80,318.465  "/>
</g>
</svg>
`;

icons["list"]["ordered"] = `
    <svg class="QuilCustomIcon" width="42" height="43" viewBox="0 0 42 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.63574 28.2328H8.08147V29.0942H6.35861V30.8171H8.08147V31.6785H4.63574V33.4014H9.80434V26.5099H4.63574V28.2328ZM6.35861 16.1727H8.08147V9.28125H4.63574V11.0041H6.35861V16.1727ZM4.63574 19.6184H7.7369L4.63574 23.2365V24.787H9.80434V23.0642H6.70318L9.80434 19.4462V17.8956H4.63574V19.6184ZM13.2501 11.0041V14.4498H37.3702V11.0041H13.2501ZM13.2501 31.6785H37.3702V28.2328H13.2501V31.6785ZM13.2501 23.0642H37.3702V19.6184H13.2501V23.0642Z" fill="#A1A19C"/>
</svg>


`;

export function QuilEditor({
  theme,
  handleOnChange,
  value,
  modules = [],
}: {
  theme: string;
  value?: string;
  handleOnChange?: (val: string) => void;
  modules?: string[];
}) {
  const [editorValue, setValue] = useState<any>("");
  const quillRef = useRef<ReactQuill | null>(null);
  const { triggerToast } = useToast();

  useEffect(() => {
    if (value) {
      setValue(value);
    }
  }, [value]);
  console.log("editor");

  const uploadHandler = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await api.post("/admin/support/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      return `${IMAGE_URL}/${response.data.data.image_path}`; // Return the URL from the server response
    } catch (error) {
      console.error("Image upload failed:", error);
      triggerToast("Something went wrong", "error");
    }
  };
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const quillEditor = quillRef.current?.getEditor();
      if (!quillEditor) return;

      const range = quillEditor.getSelection();
      if (!range) return;

      const loaderId = `loader-${Date.now()}`;

      // Insert temporary loader image
      const insertLoader = (fileUrl: string) => {
        //@ts-ignore
        quillEditor.insertEmbed(range.index, "imageLoader", {
          src: fileUrl,
          id: loaderId,
        });
        //@ts-ignore
        quillEditor.setSelection(range.index + 1);
      };

      const reader = new FileReader();
      reader.onload = () => {
        const fileUrl = reader.result as string;
        insertLoader(fileUrl);
      };
      reader.readAsDataURL(file);
      try {
        const fileUrl = await uploadHandler(file);
        if (fileUrl) {
          replaceLoaderWithImage(fileUrl, loaderId);
        } else {
          removeLoader(loaderId);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        removeLoader(loaderId);
      }
    };
  };

  const replaceLoaderWithImage = (fileUrl: string, loaderId: string) => {
    const quillEditor = quillRef.current?.getEditor();
    const loaderIndex = findLoaderIndex(loaderId);

    if (loaderIndex > -1 && quillEditor) {
      quillEditor.deleteText(loaderIndex, 1);
      quillEditor.insertEmbed(loaderIndex, "image", fileUrl);
      quillEditor.insertText(loaderIndex + 1, "\n");
      quillEditor.setSelection(loaderIndex + 2, 0);
    }
  };

  const removeLoader = (loaderId: string) => {
    const quillEditor = quillRef.current?.getEditor();
    const loaderIndex = findLoaderIndex(loaderId);

    if (loaderIndex > -1 && quillEditor) {
      quillEditor.deleteText(loaderIndex, 1);
    }
  };

  const findLoaderIndex = (loaderId: string): number => {
    const quillEditor = quillRef.current?.getEditor();
    const currentContents = quillEditor?.getContents();

    let loaderIndex = -1;
    currentContents?.ops?.forEach((op, i) => {
      if (op.insert?.imageLoader?.id === loaderId) {
        loaderIndex = i;
      }
    });

    return loaderIndex;
  };

  const mods = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: [] }],
          ["bold", "italic", "underline"],
          [{ align: [] }],
          [
            {
              color: [
                "#FF0000",
                "#001F3F",
                "#0074D9",
                "#7FDBFF",
                "#39CCCC",
                "#3D9970",
                "#2ECC40",
                "#01FF70",
                "#FFDC00",
                "#FF851B",
                "#FF4136",
                "#85144B",
                "#F012BE",
                "#B10DC9",
                "#111111",
                "#AAAAAA",
              ],
            },
          ],
          [{ list: "ordered" }],
          ...[modules],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <div className={`${styles.quilWrap} ${theme}`}>
      <ReactQuill
        ref={quillRef}
        className={styles.customQuil}
        value={value}
        onChange={(v) => {
          setValue(v);
          handleOnChange && handleOnChange(v);
        }}
        modules={mods}
      />
    </div>
  );
}
