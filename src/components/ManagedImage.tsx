"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Image from "next/image";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase-client";

type ManagedImageProps = {
  imageKey: string;
  fallback: string;
  alt: string;
  className: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
};

export default function ManagedImage({ imageKey, fallback, alt, className, fill, width, height, sizes, priority }: ManagedImageProps) {
  const [src, setSrc] = useState(fallback);

  useEffect(() => {
    if (!db) return;
    return onSnapshot(doc(db, "siteContent", "settings"), (snapshot) => {
      const images = snapshot.data()?.images as Record<string, string> | undefined;
      setSrc(images?.[imageKey] || fallback);
    });
  }, [fallback, imageKey]);

  if (src === fallback) {
    if (fill) {
      return <Image src={fallback} alt={alt} fill sizes={sizes} priority={priority} className={className} />;
    }

    if (width && height) {
      return <Image src={fallback} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className={className} />;
    }
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      width={width}
      height={height}
    />
  );
}
