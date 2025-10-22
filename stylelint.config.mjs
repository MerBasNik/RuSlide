/** @type {import("stylelint").Config} */
export default {
    extends: ["stylelint-config-standard"],
    plugins: ["stylelint-order", "stylelint-prettier"],
    rules: {
        "order/order": ["custom-properties", "declarations"],
        "order/properties-order": ["width", "height"],
        "prettier/prettier": true,
    },
};
