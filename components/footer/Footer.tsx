"use client";

import { Divider, Link } from "@nextui-org/react";
import { useCallback, useMemo } from "react";

import { siteConfig } from "@/config/site";
import { defaultLocale, localeNames } from "@/lib/i18n";
import Image from "next/image";

export default function Footer() {
  const footerNavigation = useMemo(() => {
    let current: { name: string; href?: string; onClick?: () => void }[] = [
      {
        name: "Home",
        href: "/",
      },
      {
        name: "Pricing",
        href: "/#Pricing",
      },
      {
        name: "Privacy Policy",
        href: "/privacy",
      },
      // {
      //   name: "Terms and Conditions",
      //   href: "/terms-of-service",
      // },
    ];

    return {
      current,
      follow: [
        {
          name: "Twitter/X",
          href: "https://x.com/janilychen",
        },
        {
          name: "Email",
          href: "mailto:07jackychen@gmail.com",
        },
      ],
      languages: Object.keys(localeNames).map((key) => ({
        name: localeNames[key],
        href: `/${key === defaultLocale ? "" : key}`,
      })),
    };
  }, []);

  const renderList = useCallback(
    ({
      title,
      items,
    }: {
      title: string;
      items: { name: string; href?: string; onClick?: () => void }[];
    }) => (
      <div>
        <h3 className="text-small font-semibold">{title}</h3>
        <ul className="mt-6 space-y-4">
          {items.map((item) => (
            <li key={item.name}>
              {item.onClick ? (
                <button
                  className="text-default-500 text-sm"
                  onClick={item.onClick}
                  title={item.name}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  className="text-default-500"
                  href={item.href || "#"}
                  target="_blank"
                  size="sm"
                  title={item.name}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    ),
    []
  );

  const d = new Date();
  const currentYear = d.getFullYear();
  const { authors } = siteConfig;

  return (
    <footer className="flex w-full flex-col border-t border-gray-600">
      <div className="px-6 py-8 mt-8">
        <div className="container mx-auto xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 md:pr-8">
            <div className="flex flex-row gap-2 items-center">
              <Image
                alt="Logo"
                src="/loom.svg"
                className="w-6 h-6"
                width={32}
                height={32}
              />
              <h2 className="text-medium font-medium mb-0">{siteConfig.name}</h2>
            </div>
            <span className="text-small text-default-500 block">
              {siteConfig.description}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-8 xl:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                {renderList({
                  title: "CodeLoom",
                  items: footerNavigation.current,
                })}
              </div>
              <div>
                {renderList({
                  title: "Language",
                  items: footerNavigation.languages,
                })}
              </div>
              <div>
                {renderList({
                  title: "Follow Me",
                  items: footerNavigation.follow,
                })}
              </div>
            </div>
          </div>
        </div>
        <Divider className="my-8" />
        <div className="flex space-x-2 text-default-500">
          <div>{`©${currentYear}`}</div>{" "}
          <Link
            href={authors[0].twitter || authors[0].url}
            target="_blank"
            className="text-default-500"
          >
            {authors[0].name}
          </Link>{" "}
          <div>All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
