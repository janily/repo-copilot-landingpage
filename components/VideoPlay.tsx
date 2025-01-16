"use client"

export default function VideoPlay() {

    return (
        <div className="aspect-video">
            <video className="h-full w-full rounded-lg" controls muted>
                <source src='https://teamaker-1251887421.cos.ap-guangzhou.myqcloud.com/codeloom.mp4' type="video/mp4"/>
            </video>
        </div>
    )
}