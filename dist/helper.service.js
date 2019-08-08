export function copyVariable(val) {
    var strVal = val.toString();
    alert("TODO");
}
export function slugify(val) {
    return val.toLowerCase().replace(' ', '-');
}
export function isURL(val) {
    var out = val.toString();
    var regex = /(https?:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])(:?\d*)\/?([a-z_\/0-9\-#.]*)\??([a-z_\/0-9\-#=&]*)/g;
    return out.match(regex) !== null;
}
export function humanize(value) {
    if (!value)
        return null;
    if (isURL(value)) {
        return "<a href=\"" + value + "\">link</a>";
    }
    //Boolean checks
    if (value == 'true' || value === true) {
        return '<span class="fa fa-check"></span>';
    }
    if (value == 'false' || value === false) {
        return '<span class="fa fa-times"></span>';
    }
    if (value === '?') {
        return '<span class="fa fa-question"></span>';
    }
    return value;
}
