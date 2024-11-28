import React, { useEffect, useRef, useState } from "react";
import classes from "./MenuWrapper.module.scss";
import {
  followCategoryCall,
  getProjectMenu,
  unFollowCategoryCall,
} from "../../../../../services/projects";
import PageAnimation from "../../../../../common/Components/PageAnimation/PageAnimation";
import { useDispatch } from "react-redux";
import { hideToastById, showToast } from "../../../../../store/toastSlice";
import Button from "../../../../../common/Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { goToIdPage } from "../../../../../utils/commonutils";
import { routers } from "../../../../../common/Constants";

interface MenuItem {
  id: number;
  name: string;
  image: string;
  category_following: boolean;
  description?: string;
  showLoader?: boolean;
}

interface MenuWrapperProps {
  imgUrl: string;
  onCategoryChange?: (categoryData:MenuItem) => void;
}

const MenuWrapper: React.FC<MenuWrapperProps> = ({
  imgUrl,
  onCategoryChange,
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const itemsWrapperRef = useRef<HTMLDivElement>(null);
  const activeItem = menuList[activeItemIndex] || {};
  const dispatch = useDispatch();
  const nav= useNavigate()

  useEffect(() => {
    getMenuList();
  }, []);

  useEffect(() => {
    if (window.innerWidth > 649) {
      scrollToActiveItem();
      if (onCategoryChange && menuList[activeItemIndex] && menuList[activeItemIndex].id) {
        onCategoryChange(menuList[activeItemIndex]);
      }
    }
  }, [activeItemIndex]);

  const scrollToActiveItem = () => {
    setTimeout(() => {
      const itemsWrapper = itemsWrapperRef.current;
      const categoryItems = itemsWrapper?.getElementsByClassName(
        classes.catItem
      );

      if (itemsWrapper && categoryItems) {
        const activeItem = categoryItems[activeItemIndex] as HTMLElement;
        if (activeItem) {
          const scrollPosition =
            activeItem.clientWidth * activeItemIndex + 10 * activeItemIndex;
          itemsWrapper.scrollTo({
            top: 0,
            left: scrollPosition,
            behavior: "smooth",
          });
        }
      }
    }, 50);
  };

  const updateCategory = (index: number, id: number) => {
    setActiveItemIndex(index);
  };

  const prevItem = () => {
    if (activeItemIndex > 0) {
      setActiveItemIndex(activeItemIndex - 1);
    }
  };

  const nextItem = () => {
    if (activeItemIndex < menuList.length - 1) {
      setActiveItemIndex(activeItemIndex + 1);
    }
  };

  const getMenuList = async () => {
    try {
      const response = await getProjectMenu();
      if (response?.status && response?.data?.data?.categories) {
        const categoriesWithLoader = response.data.data.categories.map(
          (category: MenuItem) => ({
            ...category,
            showLoader: true,
          })
        );
        setMenuList(categoriesWithLoader);

        if (onCategoryChange && categoriesWithLoader.length > 0) {
          onCategoryChange(categoriesWithLoader[activeItemIndex]);
        }
      }
    } catch (err) {
      console.error("Error fetching menu list:", err);
    }
  };

  const onLoadedImg = (
    event: React.SyntheticEvent<HTMLImageElement>,
    item: MenuItem
  ) => {
    setMenuList((prevList) =>
      prevList.map((menuItem) =>
        menuItem.id === item.id ? { ...menuItem, showLoader: false } : menuItem
      )
    );
  };

  const followCategory = async (categoryId: number) => {
    try {
      dispatch(
        showToast({
          message: "Loading...",
          type: "warning",
          timeout: 5000,
          id: 10,
        })
      );
      const response = await followCategoryCall({ category_id: categoryId });
      if (response?.status) {
        setMenuList((prevList) =>
          prevList.map((item) =>
            item.id === categoryId
              ? { ...item, category_following: true }
              : item
          )
        );
        dispatch(hideToastById(10));
        dispatch(
          showToast({
            message:
              response.data.data.message || "Successfully followed category",
            type: "success",
            timeout: 5000,
          })
        );
      }
    } catch (err) {
      console.error("Error following category:", err);
    }
  };

  const unFollowCategory = async (categoryId: number) => {
    try {
      dispatch(
        showToast({
          message: "Loading...",
          type: "warning",
          timeout: 5000,
          id: 10,
        })
      );
      const response = await unFollowCategoryCall(categoryId);
      if (response?.status) {
        setMenuList((prevList) =>
          prevList.map((item) =>
            item.id === categoryId
              ? { ...item, category_following: false }
              : item
          )
        );
        dispatch(hideToastById(10));
        dispatch(
          showToast({
            message:
              response.data.data.message || "Successfully unfollowed category",
            type: "success",
            timeout: 5000,
          })
        );
      }
    } catch (err) {
      console.error("Error unfollowing category:", err);
    }
  };

  const followUnfollowCategory = (isFollowing: boolean) => {
    const currentItem = menuList[activeItemIndex];
    if (!currentItem) return;

    if (!isFollowing) {
      followCategory(currentItem.id);
    } else {
      unFollowCategory(currentItem.id);
    }
  };

  return (
    <PageAnimation>
      <div className={classes.wrapOut}>
        <div className={classes.menuWrapper}>
          <div
            className={`${classes.arrowBtn} ${
              activeItemIndex === 0 ? classes.disabledIcon : ""
            }`}
            onClick={prevItem}
          >
            <img
              decoding="async"
              loading="eager"
              src="assets/images/leftArrow.png"
              alt="arrow"
            />
          </div>
          <div
            className={`${classes.itemsWrapper} ${classes.dFlex}`}
            ref={itemsWrapperRef}
          >
            {menuList.map((item: MenuItem, i: number) => (
              <div
                key={item.id}
                className={`${classes.eachItem} ${classes.catItem} ${
                  i === activeItemIndex ? classes.active : ""
                }`}
                onClick={() => updateCategory(i, item.id)}
              >
                {item.showLoader && (
                  <div className={classes.imgLoader}>
                    <div className={classes.waveContainer}>
                      <div className={classes.wave}></div>
                    </div>
                  </div>
                )}
                <div className={classes.selections}>
                  <div className={classes.sectionInner} > {item.name}</div>
                 </div>
                {/* <img
                  decoding="async"
                  loading="eager"
                  className={classes.icon}
                  src={`${imgUrl}${item.image}`}
                  alt={item.name}
                  onLoad={(e) => onLoadedImg(e, item)}
                /> */}
                {/* {i === activeItemIndex && (
                  <h2 className={`${classes.name} ${classes.mobile}`}>
                    {item.name}
                  </h2>
                )} */}
              </div>
            ))}
          </div>
          {menuList.length > 6 && (
            <div
              className={`${classes.arrowBtn} ${
                activeItemIndex === menuList.length - 1
                  ? classes.disabledIcon
                  : ""
              }`}
              onClick={nextItem}
            >
              <img
                decoding="async"
                loading="eager"
                src="assets/images/rightArrow.png"
                alt="arrow"
              />
            </div>
          )}
        </div>
        <div className={classes.detailsWrapper}>
          {/* <h2 className={`${classes.name} ${classes.web}`}>
            {activeItem?.name}
          </h2> */}
          <p className={classes.description}>{activeItem?.description}</p>
          <div className={classes.actnBtns}>
          <button
            className={classes.followBtn}
            onClick={() =>
              followUnfollowCategory(activeItem?.category_following || false)
            }
          >
            {!activeItem?.category_following ? "Follow" : "Unfollow"}
          </button>
          <Button onClick={()=>{
            const url = routers.dexGemPicks?.replace(":name", activeItem.name).replace(":id", String(activeItem.id))
            nav(url)
          }} className={classes.followBtn} theme="bordered">View all</Button>
          </div>
 
        </div>
      </div>
    </PageAnimation>
  );
};

export default MenuWrapper;
