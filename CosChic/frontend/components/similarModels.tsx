// components/SimilarModels.tsx

const SimilarModels = ({ models }: { models: any[] }) => (
    <div className="flex justify-around">
        {models.map((model, index) => (
            <div key={index} className="text-center">
                <img src={model.image} alt={model.name} className="w-30 h-30 rounded-full border-2 border-red-500 mb-4" />
                <p>{model.name} - {model.similarity}%</p>
            </div>
        ))}
    </div>
);

export default SimilarModels;
