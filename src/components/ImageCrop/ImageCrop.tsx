import React, { useRef, useState } from "react";
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
} from "react-image-crop";

import setCanvasPreview from "../setCanvasPreview/setCanvasPreview";

import { Button } from "antd";
import "./imageCrop.css";
import { updateAvatarApi } from "../../services/user-services";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCrop = ({ updateAvatar }) => {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
                if (error) {
                    setError("");
                }
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (
                    naturalWidth < MIN_DIMENSION ||
                    naturalHeight < MIN_DIMENSION
                ) {
                    setError("Image must be at least 150x150 pixels.");
                    return setImgSrc("");
                }
            });

            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    //
    const handleCropImage = () => {
        setCanvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            convertToPixelCrop(
                crop,
                imgRef.current.width,
                imgRef.current.height
            )
        );
        const dataUrl = previewCanvasRef.current.toDataURL();
        // updateAvatar(dataUrl);
        const blob = dataURLToBlob(dataUrl);

        const formData = new FormData();
        formData.append("avatar", blob, "avatar.png");

        const response = updateAvatarApi(formData);
        console.log(response);
    };

    const dataURLToBlob = (dataUrl:string) => {
        const byteString = atob(dataUrl.split(",")[1]);
        const mimeType = dataUrl.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeType });
    };

    return (
        <>
            <input
                type="file"
                accept="image/*"
                className="imageCrop__input"
                onChange={onSelectFile}
            />
            {error && <p className="imageCrop__error">{error}</p>}
            {imgSrc && (
                <div className="imageCrop__imgSrc">
                    <ReactCrop
                        crop={crop}
                        onChange={(pixelCrop, percentCrop) =>
                            setCrop(percentCrop)
                        }
                        circularCrop
                        keepSelection
                        aspect={ASPECT_RATIO}
                        minWidth={MIN_DIMENSION}
                    >
                        <img
                            ref={imgRef}
                            src={imgSrc}
                            alt="Upload"
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                    <Button type="primary" onClick={handleCropImage}>
                        Crop Image
                    </Button>
                </div>
            )}
            {crop && (
                <canvas ref={previewCanvasRef} className="imageCrop__canvas" />
            )}
        </>
    );
};

export default ImageCrop;
