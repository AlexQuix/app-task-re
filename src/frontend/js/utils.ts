export type Visibility = "hidden" | "visible";

export interface IResult<T>{
    result: T | null;
}

export enum BreakPoints{
    MOBILE = "(max-width: 576px)",
    TABLET = "(max-width: 768px)",
    LATPTOP = "(max-width: 992px)",
    DESKTOP = "(max-width: 1200px)",
    LARGER_DESKTOP = "(max-width: 1400px)",
}

/**
    * Checks if the viewport width is smaller or equal to 576px.
    * 
    * @param {function} callTrue - Function to call if the viewport width is smaller or equal to 576px.
    * @param {function} callFalse - Function to call if the viewport width is greater than 576px.
*/
export function isMobile(
    callTrue:()=>void, callfalse?:()=>void
) {
    if (matchMedia(BreakPoints.MOBILE).matches)
        return callTrue();

    if(callfalse) callfalse();
}

/**
    * Checks if the viewport width is smaller or equal to 576px.
    * 
    * @param {function} callTrue - Function to call if the viewport width is smaller or equal to 576px.
    * @param {function} callFalse - Function to call if the viewport width is greater than 576px.
*/
export function isTablet(
    callTrue:()=>void, callfalse?:()=>void
) {
    if (matchMedia(BreakPoints.TABLET).matches)
        return callTrue();

    if(callfalse) callfalse();
}