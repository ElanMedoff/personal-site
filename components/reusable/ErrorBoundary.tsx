import React, { Component, ReactNode } from "react";

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div className="w-max p-8 text-3xl">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/">
              <span className="text-base-content">elanmed</span>
              <span className="hidden sm:inline text-primary">.dev</span>
            </a>
          </div>
          <div className="w-full text-center mt-32">
            <h1 className="text-4xl p-4">Something went wrong!</h1>
            <p>Please reload the page or try again later.</p>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
