import * as s from "./Social.styled"; // Ensure styles are imported correctly
import sprite from "/src/assets/icons/sprite.svg"; // Updated to absolute path for consistency

const Social = () => {
  // Social links directly embedded in the component
  const socialLinks = [
    {
      id: "facebook",
      link: "https://www.facebook.com/",
      icon: "facebook",
    },
    {
      id: "instagram",
      link: "https://www.instagram.com/",
      icon: "instagram",
    },
    {
      id: "youtube",
      link: "https://www.youtube.com/",
      icon: "youtube",
    },
  ];

  return (
    <s.Wrapper>
      {socialLinks.map((item) => (
        <s.Item key={item.id}>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${item.id}`} // Clearer ARIA label for accessibility
          >
            <svg width={28} height={28} aria-hidden="true" focusable="false">
              <use href={`${sprite}#${item.icon}`} />
            </svg>
          </a>
        </s.Item>
      ))}
    </s.Wrapper>
  );
};

export default Social;
