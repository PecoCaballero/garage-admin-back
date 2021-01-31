module.exports = (mongoose) => {
    const ParkingSpace = mongoose.model(
        "parkingSpace",
        mongoose.Schema(
            {
                number: Number,
                available: Boolean
            },
        ),
        "parkingSpace"
    );
    return ParkingSpace;
};
