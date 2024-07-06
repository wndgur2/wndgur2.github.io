import React, { FunctionComponent, useCallback, useEffect, useRef } from "react";
import "./FooterLink.css";
import { Link } from "react-router-dom";

interface FooterLinkProps {
    title: string;
    children: React.ReactNode;
    url: string;
}

const FooterLink: FunctionComponent<FooterLinkProps> = ({ title, children, url }) => {
    const itemRef = useRef<HTMLAnchorElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const childrenRef = useRef<HTMLDivElement>(null);
    const titleHeightRef = useRef<number>(0);
    const childrenHeightRef = useRef<number>(0);
    const paddingRef = useRef<number>(2);
    const hoveredPaddingRef = useRef<number>(2);

    const mouseEnter = useCallback(() => {
        if (!itemRef.current || !childrenRef.current || !titleRef.current) return;
        itemRef.current.style.height = `calc(${hoveredPaddingRef.current * 2}em + ${titleHeightRef.current}px + ${childrenHeightRef.current}px)`;
        childrenRef.current.style.opacity = "1";
        titleRef.current.classList.add("hovered");
    }, []);

    const mouseLeave = useCallback(() => {
        if (!itemRef.current || !childrenRef.current || !titleRef.current) return;
        itemRef.current.style.height = `calc(${paddingRef.current * 2}em + ${titleHeightRef.current}px)`;
        childrenRef.current.style.opacity = "0";
        titleRef.current.classList.remove("hovered");
    }, []);

    useEffect(() => {
        //get heights
        if (!titleRef.current || !childrenRef.current || !itemRef.current) return;
        titleHeightRef.current = titleRef.current.getBoundingClientRect().height;
        childrenHeightRef.current = childrenRef.current.getBoundingClientRect().height;
        itemRef.current.style.height = `calc(${paddingRef.current * 2}em + ${titleHeightRef.current}px)`;


        const current = itemRef.current;
        current.addEventListener("mouseenter", mouseEnter);
        current.addEventListener("mouseleave", mouseLeave);
        current.addEventListener("touchstart", mouseEnter);

        return () => {
            current.removeEventListener("mouseenter", mouseEnter);
            current.removeEventListener("mouseleave", mouseLeave);
            current.removeEventListener("touchstart", mouseEnter);
        }
    }, [mouseEnter, mouseLeave]);

    return (
        <Link className="footer-link" to={url} rel="noreferrer" target="_blank" ref={itemRef}>
            <div className="footer-link-title">
                <h4 ref={titleRef}>{title} </h4>
            </div>
            <div className="footer-link-children" ref={childrenRef}>
                {children}
            </div>
        </Link>
    );
}

export default FooterLink;