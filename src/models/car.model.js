module.exports = (mongoose) => {
    const Car = mongoose.model(
        "car",
        mongoose.Schema(
            {
                licensePlate: String,
                model: String,
                brand: String,
                year: Number,
                ownerID: String,
                parkingSpaceNumber: Number,
            },
            { timestamps: true }
        )
    );
    return Car;
};
