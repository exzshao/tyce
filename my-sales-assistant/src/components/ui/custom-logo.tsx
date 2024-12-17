export function CustomLogo({ className = "", ...props }: React.ComponentProps<"svg">) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        {...props}
      >
        {/* Main asterisk shape */}
        <path d="M12 2L9.5 9L2 12L9.5 15L12 22L14.5 15L22 12L14.5 9L12 2Z" />
        {/* Horizontal line through the middle */}
        <rect x="2" y="11" width="20" height="2" />
      </svg>
    )
  }
  
  