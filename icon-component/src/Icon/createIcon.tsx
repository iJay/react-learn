import Icon, { type IconProps } from "./index";

interface CreateIconProps {
  iconProps?: IconProps;
  content: React.ReactNode;
  viewBox?: string;
}

function CreateIcon(options: CreateIconProps) {
  const { content, iconProps = {}, viewBox = '0 0 1024 1024' } = options
  return (props: IconProps) => {
    const { ref } = props
    return (
      <Icon ref={ref} viewBox={viewBox} {...iconProps} {...props}>
        { content }
      </Icon>
    )
  }
}

export default CreateIcon
