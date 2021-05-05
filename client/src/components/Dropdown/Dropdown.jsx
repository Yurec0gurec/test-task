/* eslint-disable react/destructuring-assignment */
import React, {Component} from "react";

import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getPhotosData} from "../../store/actions/photos";
import {ReactComponent as ArrowDown} from "./assets/arrowDown.svg";
import {ReactComponent as ArrowUp} from "./assets/arrowUp.svg";
import "../styles/Dropdown.css";

class Dropdown extends Component {
	constructor(props) {
		super(props);
		const {title, list, getPhotosData} = this.props;

		this.state = {
			isListOpen: false,
			title,
			selectedItem: null,
			keyword: "",
			list,
			photos: [],
			loading: false,
			page: 0,
			prevY: 0,
			getPhotosData
		};
		this.searchField = React.createRef();
	}

	componentDidMount() {
		const {select} = this.props;

		if (select) {
			this.selectSingleItem(select);
		}
		this.getPhotos(this.state.page);
	}

	onScroll(oList) {
		if (this.isRequestNeeded(oList.currentTarget) && !this.props.loading) {
			console.log("request is needed");
			const lastPhoto = this.props.photosData[this.props.photosData.length - 1];
			const curPage = lastPhoto.albumId;
			this.getPhotos(curPage + 1);
			this.setState({page: curPage + 1});
		}
	}

	isRequestNeeded(el) {
		return el.scrollHeight - el.scrollTop <= 3500;
	}

	getPhotos(page) {
		this.state.getPhotosData(page);
	}

	componentDidUpdate() {
		const {isListOpen} = this.state;

		setTimeout(() => {
			if (isListOpen) {
				window.addEventListener("click", this.close);
			} else {
				window.removeEventListener("click", this.close);
			}
		}, 0);
	}

	componentWillUnmount() {
		window.removeEventListener("click", this.close);
	}

	close = () => {
		this.setState({
			isListOpen: false
		});
	};

	clearSelection = () => {
		const {name, title, onChange} = this.props;

		this.setState(
			{
				selectedItem: null,
				title
			},
			() => {
				onChange(null, name);
			}
		);
	};

	selectSingleItem = (item) => {
		const {photos} = this.props;

		const selectedItem = photos.find((i) => i.title === item.title);
		this.selectItem(selectedItem);
	};

	selectItem = (item) => {
		const {title} = item;
		const {photos, selectedItem} = this.state;
		const {name, onChange} = this.props;

		let foundItem;

		if (!title) {
			foundItem = photos.find((i) => i.title === item.title);
		}

		this.setState(
			{
				title: title || foundItem.title,
				isListOpen: false,
				selectedItem: item
			},
			() => selectedItem?.title !== title && onChange(item, name)
		);
	};

	toggleList = () => {
		this.setState(
			(prevState) => ({
				isListOpen: !prevState.isListOpen,
				keyword: ""
			}),
			() => {
				if (this.state.isListOpen && this.searchField.current) {
					this.searchField.current.focus();
					this.setState({
						keyword: ""
					});
				}
			}
		);
	};

	filterList = (e) => {
		this.setState({
			keyword: e.target.value.toLowerCase()
		});
	};

	listItems = () => {
		const {id, searchable, styles, photosData} = this.props;
		const {listItem, listItemNoResult} = styles;
		const {keyword} = this.state;
		let tempList = [...photosData];

		if (keyword.length) {
			tempList = photosData.filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase()));
		}
		if (tempList.length) {
			return tempList.map((user, index) => (
				<button type="button" className={`dd-list-item ${id}`} style={listItem} key={user.id} onClick={() => this.selectItem(user)}>
					<div>
						<img src={user.url} height="80px" alt="empty" width="100px" />
						<p>{user.title}</p>
					</div>
				</button>
			));
		}

		return (
			<div className={`dd-list-item no-result ${id}`} style={listItemNoResult}>
				{searchable[1]}
			</div>
		);
	};

	render() {
		const {id, searchable, arrowUpIcon, arrowDownIcon, styles, listItem} = this.props;
		const {isListOpen, title} = this.state;

		const {wrapper, header, headerTitle, headerArrowUpIcon, headerArrowDownIcon, list, listSearchBar, scrollList} = styles;

		const loadingTextCSS = {display: this.props.loading ? "block" : "none"};

		return (
			<div className={`dd-wrapper ${id}`} style={wrapper}>
				<button type="button" className={`dd-header ${id}`} style={header} onClick={this.toggleList}>
					<div className={`dd-header-title ${id}`} style={headerTitle}>
						{title}
					</div>
					{isListOpen ? (
						<span style={headerArrowUpIcon}>{arrowUpIcon || <ArrowUp />}</span>
					) : (
						<span style={headerArrowDownIcon}>{arrowDownIcon || <ArrowDown />}</span>
					)}
				</button>
				{isListOpen && (
					<div className={`dd-list${searchable ? " searchable" : ""} ${id}`} style={list}>
						{searchable && (
							<input
								ref={this.searchField}
								className={`dd-list-search-bar ${id}`}
								style={listSearchBar}
								placeholder={searchable[0]}
								onClick={(e) => e.stopPropagation()}
								onChange={(e) => this.filterList(e)}
							/>
						)}
						<div onScroll={this.onScroll.bind(this)} className={`dd-scroll-list ${id}`} style={scrollList}>
							{this.listItems()}
							<button type="button" className={`dd-list-item ${id}`} style={listItem}>
								<span style={loadingTextCSS}>Loading...</span>
							</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}

Dropdown.defaultProps = {
	id: "",
	select: undefined,
	searchable: [],
	styles: {},
	arrowUpIcon: null,
	arrowDownIcon: null,
	checkIcon: null
};

Dropdown.propTypes = {
	id: PropTypes.string,
	styles: PropTypes.shape({
		wrapper: PropTypes.string,
		header: PropTypes.string,
		headerTitle: PropTypes.string,
		headerArrowUpIcon: PropTypes.string,
		headerArrowDownIcon: PropTypes.string,
		checkIcon: PropTypes.string,
		listSearchBar: PropTypes.string,
		scrollList: PropTypes.string,
		listItem: PropTypes.string,
		listItemNoResult: PropTypes.string
	}),
	title: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	select: PropTypes.shape({title: PropTypes.string}),
	checkIcon: PropTypes.elementType,
	arrowUpIcon: PropTypes.elementType,
	arrowDownIcon: PropTypes.elementType
};
const mapStateToProps = (state) => {
	return {
		photosData: state.photosStore.photos,
		loading: state.photosStore.loading,
		page: state.page
	};
};

const dispatchToProps = (dispatch) => ({
	getPhotosData: (page) => dispatch(getPhotosData(page))
});

export default connect(mapStateToProps, dispatchToProps)(Dropdown);
