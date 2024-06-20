// components/SimilarModels.tsx
// 0620 11:11 backup
const SimilarModels = ({ models }: { models: any[] }) => (
    <div className="flex justify-around">
        {models.map((model, index) => (
            <div key={index} className="text-center">
                <img src={model.modelPhotoUrl} alt={model.names} className="w-30 h-30 rounded-full border-2 border-red-500 mb-4" />
                <p>{model.names}</p>
            </div>
        ))}
    </div>
);

export default SimilarModels;
