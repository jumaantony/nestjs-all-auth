export function padPassword(password: string) {
  const paddedPassword = `${process.env.PREFIX_PADDING}${password}${process.env.SUFFIX_PADDING}`;
  return paddedPassword;
}
