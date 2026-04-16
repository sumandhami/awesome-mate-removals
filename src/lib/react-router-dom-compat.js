"use client";
/* eslint-disable react/prop-types */

import { forwardRef, isValidElement } from "react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";

const EXTERNAL_SCHEMES = ["http://", "https://", "mailto:", "tel:", "#"];

function normalizeHref(target) {
  if (!target) {
    return "/";
  }

  if (typeof target === "string") {
    if (target === "[object Object]") {
      return "/";
    }
    return target;
  }

  if (typeof target === "object") {
    const pathname = target.pathname || "/";
    const search = target.search || "";
    const hash = target.hash || "";
    return `${pathname}${search}${hash}`;
  }

  return "/";
}

function isExternalLink(href) {
  return EXTERNAL_SCHEMES.some((scheme) => href.startsWith(scheme));
}

function hasNestedLinkElements(node) {
  if (node == null || typeof node === "boolean") {
    return false;
  }

  if (Array.isArray(node)) {
    return node.some((item) => hasNestedLinkElements(item));
  }

  if (!isValidElement(node)) {
    return false;
  }

  const elementType = node.type;

  if (typeof elementType === "string" && elementType.toLowerCase() === "a") {
    return true;
  }

  if (elementType === NextLink || elementType?.__compatRouterLink) {
    return true;
  }

  return hasNestedLinkElements(node.props?.children);
}

function resolveSerializedNavLinkClassName(className, isActive) {
  if (typeof className !== "string") {
    return className;
  }

  const legacyClassSuffix = className.replace(
    /^\s*(?:\(\s*\{[\s\S]*?\}\s*\)|\w+)\s*=>[\s\S]*?(?:""|''|\"\")\s*;?\s*\}?\s*/,
    ""
  );

  if (legacyClassSuffix === className) {
    return className;
  }

  return `${isActive ? "active" : ""} ${legacyClassSuffix}`.trim();
}

export const Link = forwardRef(function CompatLink(
  { to, href, children, ...props },
  ref
) {
  const resolvedHref = normalizeHref(href ?? to);

  if (isExternalLink(resolvedHref)) {
    return (
      <a href={resolvedHref} ref={ref} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={resolvedHref} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.__compatRouterLink = true;

export function NavLink({
  to,
  href,
  className,
  children,
  end,
  ...props
}) {
  const pathname = usePathname() || "/";
  const resolvedHref = normalizeHref(href ?? to);

  const isActive = end
    ? pathname === resolvedHref
    : pathname === resolvedHref ||
      (resolvedHref !== "/" && pathname.startsWith(`${resolvedHref}/`));

  const resolvedClassName =
    typeof className === "function"
      ? className({ isActive, isPending: false })
      : resolveSerializedNavLinkClassName(className, isActive);

  const resolvedChildren =
    typeof children === "function"
      ? children({ isActive, isPending: false })
      : children;

  if (hasNestedLinkElements(resolvedChildren)) {
    return (
      <span
        className={resolvedClassName}
        aria-current={isActive ? "page" : undefined}
        {...props}
      >
        {resolvedChildren}
      </span>
    );
  }

  if (isExternalLink(resolvedHref)) {
    return (
      <a href={resolvedHref} className={resolvedClassName} {...props}>
        {resolvedChildren}
      </a>
    );
  }

  return (
    <NextLink
      href={resolvedHref}
      className={resolvedClassName}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {resolvedChildren}
    </NextLink>
  );
}

export function useNavigate() {
  const router = useRouter();

  return (to) => {
    router.push(normalizeHref(to));
  };
}

export function useLocation() {
  return {
    pathname: usePathname() || "/",
  };
}

export function Outlet({ children = null }) {
  return children;
}

export function createBrowserRouter() {
  return {};
}

export function RouterProvider({ children = null }) {
  return children;
}
