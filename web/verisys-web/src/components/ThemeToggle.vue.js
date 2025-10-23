import { applyTheme, getInitialTheme } from '../lib/theme';
import { Sun, Moon } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';
const theme = ref(getInitialTheme());
onMounted(() => applyTheme(theme.value));
function toggle() { theme.value = theme.value === 'light' ? 'dark' : 'light'; applyTheme(theme.value); }
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.toggle) },
    ...{ class: "btn btn-outline" },
    'aria-label': "Toggle theme",
});
// @ts-ignore
[toggle,];
if (__VLS_ctx.theme === 'light') {
    // @ts-ignore
    [theme,];
    const __VLS_0 = {}.Sun;
    /** @type {[typeof __VLS_components.Sun, ]} */ ;
    // @ts-ignore
    Sun;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        size: (18),
        ...{ class: "u-text-muted" },
    }));
    const __VLS_2 = __VLS_1({
        size: (18),
        ...{ class: "u-text-muted" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
else {
    const __VLS_5 = {}.Moon;
    /** @type {[typeof __VLS_components.Moon, ]} */ ;
    // @ts-ignore
    Moon;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        size: (18),
        ...{ class: "u-text-muted" },
    }));
    const __VLS_7 = __VLS_6({
        size: (18),
        ...{ class: "u-text-muted" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['u-text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['u-text-muted']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
