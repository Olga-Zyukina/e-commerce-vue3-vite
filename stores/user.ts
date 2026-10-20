export const useUserStore = defineStore("users", () => {
  const user = ref<UserData>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: "",
    status: "",
    orderUpdates: false,
    promotions: false,
    newsLetter: true,
    password: "",
    paymentMethods: [
      {
        paySystem: "",
        number: "",
        expires: "",
      },
    ],
    reviews: [
      {
        idProduct: 0,
        rating: 0,
        data: "",
        review: "",
      },
    ],
    wish: [],
  });
  const countWish = ref<number>(0);

  const addToWish = (idProduct: number) => {
    if (user.value) {
      if (!user.value.wish.includes(idProduct)) {
        user.value.wish.push(idProduct);
        countWish.value = user.value.wish.length;
      }
    } else {
      throw new Error("No news data available");
    }
  };

  const removeUserWish = (index: number | string) => {
    user.value.wish.splice(+index, 1);
    countWish.value--;
  };
  return { user, countWish, addToWish, removeUserWish };
});
