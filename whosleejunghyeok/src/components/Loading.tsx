import { FunctionComponent, useEffect, useState } from "react";
import './Loading.css';

interface LoadingProps {
    phrase: string;
}

const Loading: FunctionComponent<LoadingProps> = ({ phrase }) => {
    const [dot, setDot] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setDot((dot + 1) % 4);
        }, 500);
    }, [dot]);

    return (
        <div className="loading">
            <div className="spinner" />
            <p>{phrase}{'.'.repeat(dot)}</p>
        </div>
    );
}

export default Loading;