module.exports = (mongoose) => {
    const User = mongoose.model(
        "user",
        mongoose.Schema(
            {
                name: String,
                phone: String,
                cars: [String],
            },
            { timestamps: true }
        )
    );
    return User;
};
