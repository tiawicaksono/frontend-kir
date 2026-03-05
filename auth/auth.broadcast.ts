let channel: BroadcastChannel | null = null;

export const getAuthChannel = () => {
  if (!channel) {
    channel = new BroadcastChannel("auth");
  }
  return channel;
};

export const broadcastLogin = () => {
  getAuthChannel().postMessage("LOGIN");
};

export const broadcastLogout = () => {
  getAuthChannel().postMessage("LOGOUT");
};
