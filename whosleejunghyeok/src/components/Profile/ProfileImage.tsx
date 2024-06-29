import { FunctionComponent, useEffect, useRef, useState } from "react";
import "./ProfileImage.css";

interface ProfileImageProps {
    children: React.ReactNode;
}

const ProfileImage: FunctionComponent<ProfileImageProps> = ({ children }) => {
    const [clickCount, setClickCount] = useState<number>(0);
    const profileRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (clickCount > 10)
            profileRef.current?.classList.add("hidden");
    }, [clickCount]);

    const profileClicked = () => {
        if (clickCount > 10) return;
        if (!profileRef.current) return;
        setClickCount(clickCount + 1);

        switch (Math.floor(Math.random() * 8)) {
            case 0:
                profileRef.current.style.animation = "spinLeft 0.3s";
                break;
            case 1:
                profileRef.current.style.animation = "spinRight 0.3s";
                break;
            default:
                profileRef.current.style.animation = "shake 0.3s";
                break;
        }
        setTimeout(() => {
            if (profileRef.current)
                profileRef.current.style.animation = "";
        }, 300);
    }

    return (
        <button className="profile-img-wrapper" onClick={profileClicked} ref={profileRef}>
            {children}
        </button>
    );
}

export default ProfileImage;