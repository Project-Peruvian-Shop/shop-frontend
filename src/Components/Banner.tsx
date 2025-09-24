type BannerProps = {
    title: string
}

const Banner = ({ title }: BannerProps) => {
    return (
    <div>
        <h1>{title}</h1>
    </div>
    )
}

export default Banner;