const UserProfileImage = ({ src }: { src: string }) => (
    <div>
        <img src={src} alt="원본 사진" className="w-60 h-60 rounded-md mr-40" />
        <p>원본 사진</p>
    </div>
);

export default UserProfileImage;