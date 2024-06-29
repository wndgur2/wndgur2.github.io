import { FunctionComponent, useEffect, useRef } from "react";
import './ImageSkeleton.css';
interface ImageSkeletonProps {
    img?: JSX.Element;
    props: any;
}

const ImageSkeleton: FunctionComponent<ImageSkeletonProps> = ({ img, props }) => {
    const skeletonRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    useEffect(() => {
        if (!imgRef.current) return;
        const image = imgRef.current.querySelector('img');

        if (!image) return;
        image.src = props.src;
        image.onload = () => {
            if (!skeletonRef.current) return;
            skeletonRef.current.style.display = 'none';
            if (!imgRef.current) return;
            imgRef.current.classList.replace('loading', 'loaded');
        };

    }, [props.src]);

    return (
        <>
            <div className="image-skeleton" ref={skeletonRef} />
            <div className="img-wrapper loading" ref={imgRef}>
                <img alt="" {...props} />
            </div>
        </>
    );
}

export default ImageSkeleton;