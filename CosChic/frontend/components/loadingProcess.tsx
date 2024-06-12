export default function LoadingProcess() {
    return (
        <div className='flex w-full space-x-2 justify-center items-center bg-white h-screen dark:invert'>
            <span className='sr-only'>Loading...</span>
            <div className='h-8 w-8 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-8 w-8 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-8 w-8 bg-green-600 rounded-full animate-bounce'></div>
        </div>
    )
}