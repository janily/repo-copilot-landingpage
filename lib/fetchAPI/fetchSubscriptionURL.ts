import { User } from "firebase/auth";

const fetchSubscriptionURLAPI = async ({ currentUser, subscriptionId }: { currentUser: User; subscriptionId: string }) => {
  const idToken = await currentUser.getIdToken();
  const response = await fetch(`/api/payment/subscription?subscriptionId=${subscriptionId}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${idToken}`,
    }
  });
  return response
};

export default fetchSubscriptionURLAPI