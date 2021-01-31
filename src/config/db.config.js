module.exports = {
    url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/garage-admin?retryWrites=true&w=majority`,
};
