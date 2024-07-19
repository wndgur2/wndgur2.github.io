import { FunctionComponent, useEffect, useRef, useState } from "react";
import "./ProfileImage.css";

const IMG_AMOUNT = 5;

const ProfileImage: FunctionComponent = () => {
    const [clickCount, setClickCount] = useState<number>(0);
    const profileRef = useRef<HTMLButtonElement>(null);
    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        // preload images
        for (let i = 0; i < IMG_AMOUNT; i++) {
            const img = new Image();
            img.src = `images/profile/${i}.jpeg`;
        }
    })

    useEffect(() => {
        if (!profileRef.current) return;
        profileRef.current.style.background = `url(images/profile/${imgIndex}.jpeg)`;
        profileRef.current.style.backgroundSize = "cover";

    }, [imgIndex]);

    const profileClicked = () => {
        // if (clickCount > 10) return;
        if (!profileRef.current) return;
        setClickCount(clickCount + 1);

        switch (Math.floor(Math.random() * 2)) {
            case 0:
                profileRef.current.style.animation = "spinLeft 0.3s";
                setImgIndex((imgIndex + 1) % IMG_AMOUNT);
                break;
            case 1:
                profileRef.current.style.animation = "spinRight 0.3s";
                setImgIndex((imgIndex + 2) % IMG_AMOUNT);
                break;
            default:
                profileRef.current.style.animation = "shake 0.3s";
                break;
        }
        profileRef.current.disabled = true;
        setTimeout(() => {
            if (profileRef.current) {
                profileRef.current.style.animation = "";
                profileRef.current.disabled = false;
            }
        }, 300);
    }

    return (
        <button className="profile-img-wrapper" onClick={profileClicked} ref={profileRef}>
            <img className="profile-img" src={`images/profile/${imgIndex}.jpeg`} alt="profile" />
        </button>
    );
}

export default ProfileImage;