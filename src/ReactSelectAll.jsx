import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Select, {components} from 'react-select';
import makeAnimated from 'react-select/animated';

const allOption = {
	label: 'All',
	value: '*'
};

const animatedComponents = makeAnimated();

const Option = props => (
	<div>
		<components.Option {...props}>
			<input type="checkbox" checked={props.isSelected} onChange={() => null}/>{' '}
			<label>{props.label}</label>
		</components.Option>
	</div>
);

const MultiValue = props => {
	let labelToBeDisplayed = props.data.label;
	if (props.data.value === allOption.value) {
		labelToBeDisplayed = allOption.label;
	}
	return (
		<components.MultiValue {...props}>
			<span>{labelToBeDisplayed}</span>
		</components.MultiValue>
	);
};

const ValueContainer = ({children, ...props}) => {
	const currentValues = props.getValue();
	let toBeRendered = children;
	if (currentValues.some(val => val.value === allOption.value)) {
		toBeRendered = [[children[0][0]], children[1]];
	}

	return <components.ValueContainer {...props}>{toBeRendered}</components.ValueContainer>;
};

const renderComponents = props => {
	if (props.isMulti && !props.isSelectAll) {
		return {Option, MultiValue, animatedComponents};
	}
	if (props.isMulti && props.isSelectAll) {
		return {Option, MultiValue, ValueContainer, animatedComponents};
	}
	return {};
};

const onChangeHandler = (selected, event, props) => {
	if (props.isSelectAll && props.isMulti) {
		if (selected !== null && selected.length > 0) {
			if (selected[selected.length - 1].value === props.allOption.value) {
				return props.onHandleSelectChange(
					[props.allOption, ...props.data],
					props.containerName
				);
			}
			let result = [];
			if (selected.length === props.data.length) {
				if (selected.includes(props.allOption)) {
					result = selected.filter(option => option.value !== props.allOption.value);
				} else if (event.action === 'select-option') {
					result = [props.allOption, props.data];
				}
				return props.onHandleSelectChange(result, props.containerName);
			}
		}

		return props.onHandleSelectChange(selected, props.containerName);
	}
	return props.onHandleSelectChange(selected, props.containerName);
};

const ReactSelectAll = props => {
	return (
		<Fragment>
			{props.label && (
				<label>
					{props.label}
				</label>
			)}
			<Select
				placeholder={props.placeholder}
				options={[props.allOption, ...props.data]}
				components={renderComponents(props)}
				name={props.containerName}
				isMulti={props.isMulti}
				role="listbox"
				onChange={(selected, event) => onChangeHandler(selected, event, props)}
				className={props.className}
				value={props.value}
				isDisabled={props.isDisabled}
				closeMenuOnSelect={props.closeMenuOnSelect}
				hideSelectedOptions={props.hideSelectedOptions}
				backspaceRemovesValue={props.backspaceRemovesValue}
				{...props}
				{...props.otherProps}
			/>
		</Fragment>
	);
};

ReactSelectAll.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	isMulti: PropTypes.bool,
	onHandleSelectChange: PropTypes.func.isRequired,
	containerName: PropTypes.string.isRequired,
	isDisabled: PropTypes.bool,
	closeMenuOnSelect: PropTypes.bool,
	hideSelectedOptions: PropTypes.bool,
	backspaceRemovesValue: PropTypes.bool,
	className: PropTypes.string,
	sortData: PropTypes.bool,
	isSelectAll: PropTypes.bool,
	allOption: PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string
	}),
	value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
	label: PropTypes.string,
	placeholder: PropTypes.string
};

ReactSelectAll.defaultProps = {
	isMulti: false,
	closeMenuOnSelect: true,
	hideSelectedOptions: false,
	backspaceRemovesValue: true,
	className: '',
	sortData: true,
	isDisabled: false,
	isSelectAll: false,
	allOption: {
		label: 'All',
		value: '*'
	},
	label: '',
	placeholder: 'Select option(s)'
};

export default ReactSelectAll;
