export const getAvatarUrl = (name: string | null | undefined): string => {
  if (!name) return 'https://api.dicebear.com/7.x/initials/svg?seed=U&backgroundColor=FF385C,1DA1F2';
  return `https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundColor=FF385C,1DA1F2`;
}; 