import { FormEvent, useState, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Spacing } from 'components/spacing';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { useOutsideClickClose } from 'src/hooks/useOutsideClickClose';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	defaultValue: ArticleStateType;
	onChange?: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultValue,
	onChange,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState(defaultValue);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		rootRef,
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
	});

	const getChangeHandler = (fieldName: keyof ArticleStateType) => {
		return function <T>(selectedOption: T) {
			setFormState((prev) => ({
				...prev,
				[fieldName]: selectedOption,
			}));
		};
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onChange?.(defaultArticleState);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onChange?.(formState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton
				onClick={() => setIsMenuOpen((prev) => !prev)}
				isContainerOpen={isMenuOpen}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text family='open-sans' weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<Spacing size={50} />
					<Select
						title='шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={getChangeHandler('fontFamilyOption')}
					/>
					<Spacing size={50} />
					<RadioGroup
						title='размер шрифта'
						name={'dsa'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={getChangeHandler('fontSizeOption')}
					/>
					<Spacing size={50} />
					<Select
						title='цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={getChangeHandler('fontColor')}
					/>
					<Spacing size={50} />
					<Separator />
					<Spacing size={50} />
					<Select
						title='цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={getChangeHandler('backgroundColor')}
					/>
					<Spacing size={50} />
					<Select
						title='ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={getChangeHandler('contentWidth')}
					/>
					<Spacing size={207} />

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
