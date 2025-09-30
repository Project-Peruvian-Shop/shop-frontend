type BannerProps = {
    title: string
}

const Banner = ({ title }: BannerProps) => {
    return (
    <div>
        <h2>{title}</h2>
    </div>
    )
}

export default Banner;