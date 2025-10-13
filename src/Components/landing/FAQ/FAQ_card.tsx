import styles from "./FAQ_card.module.css"

interface FAQCardProps {
	img: string
	title: string
	description: string	
	color: string
	index: number
	hoveredIndex: number | null
	setHoveredIndex: (index: number | null) => void
}

export function FAQCard({
	img,
	title,
	description,
	color,
	index,
	hoveredIndex,
	setHoveredIndex,
}: FAQCardProps) {
	return (
		<div
			className={`${styles.faqCard} ${
				hoveredIndex === index ? styles.hovered : ""
			}`}
			onMouseEnter={() => setHoveredIndex(index)}
			onMouseLeave={() => setHoveredIndex(null)}
		>
			<div
				className={styles.faqCardBar}
				style={{
					backgroundColor: color,
					transform: hoveredIndex === index ? "scaleX(1)" : "scaleX(0)",
				}}
			/>
			<div
				className={styles.faqCardIcon}
				style={{
					backgroundImage: `url(${img})`,
					backgroundColor: hoveredIndex === index ? color : "#f8f9fa",
				}}
			/>
			<h3 className={styles.faqCardTitle}>{title}</h3>
			<p
				className={styles.faqCardDesc}
				dangerouslySetInnerHTML={{ __html: description }}
			/>
		</div>
	)
}
