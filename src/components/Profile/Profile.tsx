import { FunctionComponent } from "react";
import "./Profile.css";
import Tag from "../Tag";
import ProfileImage from "./ProfileImage";
import Marquee from "react-fast-marquee";

const Profile: FunctionComponent = () => {
    const stacks = ["HTML", "CSS", "Typescript", "Javascript", "ReactJs", "NextJs", "Express"];
    return (
        <div className="profile">
            <ProfileImage >
                <img className="profile-img" src="/images/profile.jpeg" alt="profile" />
            </ProfileImage>
            <div className="profile-content">
                <h1 className="profile-name">이중혁</h1>
                <h2 className="profile-description">
                    협력, 성장!
                </h2>
                <div className="profile-tags">
                    {stacks.map((stack, index) => (
                        <Tag key={index} tag={stack} />
                    ))}
                </div>
            </div>

            <div className="marquee-container">
                <Marquee className="marquee">
                    <span className="in-marquee">
                        {"whosleejunghyeok".repeat(5)}
                    </span>
                </Marquee>
            </div>
        </div>
    );
}

export default Profile;