import { colors } from "../../../utils/colors";
import { ClockIcon, DoubleTickIcon, SingleTickIcon } from "./SvgIcons";

export const StatusIcon = ({ status }) => {
  if (status === 'read') {
    return <DoubleTickIcon color="#34B7F1" size={16} />;
  }

  if (status === 'delivered') {
    return <DoubleTickIcon color={colors.neutral[400] || '#ccc'} size={16} />;
  }

  if (status === 'sent') {
    return <SingleTickIcon color={colors.neutral[400] || '#ccc'} size={16} />;
  }
  return <ClockIcon color={colors.neutral[400] || '#ccc'} size={12} />;
};