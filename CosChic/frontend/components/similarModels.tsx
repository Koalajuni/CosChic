const SimilarModels = ({ models }: { models: any[] }) => (
    <div className="flex h-full justify-around border rounded-xl py-3">
        {models.map((model, index) => (
            <div key={index} className="text-center">
                <div className="relative w-full h-full">
                    <img
                        src={model.modelPhotoUrl}
                        alt={model.names}
                        className="inset-0 w-[150px] h-[150px] object-cover rounded-full border-2 border-[#FF6F91] rounded-md shadow-xl"
                        style={{ aspectRatio: '1/1' }}
                    />
                    <p className="truncate">{model.names}</p>
                </div>
                {/* <p className="truncate">{model.names}</p> */}
            </div>
        ))}
    </div>
);

export default SimilarModels;
