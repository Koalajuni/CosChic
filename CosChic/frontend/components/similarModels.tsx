const SimilarModels = ({ models }: { models: any[] }) => (
    <div className="flex justify-around py-3">
        {models.map((model, index) => (
            <div key={index} className="text-center">
                <div className="relative w-full h-full">
                    <img
                        src={model.modelPhotoUrl}
                        alt={model.names}
                        className="inset-0 w-[150px] h-[150px] object-cover rounded-full border-2 border-red-500"
                        style={{ aspectRatio: '1/1' }}
                    />
                </div>
                <p className="truncate">{model.names}</p>
            </div>
        ))}
    </div>
);

export default SimilarModels;
