import Card from './ui/Card.vue';
import Badge from './ui/Badge.vue';
import { CheckCircle2, Pencil, Trash2 } from 'lucide-vue-next';
const emit = defineEmits();
const props = defineProps();
function tone() {
    if (props.status === 'done')
        return 'success';
    if (props.status === 'doing')
        return 'warn';
    return 'default';
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {[typeof Card, typeof Card, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Card, new Card({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
const { default: __VLS_4 } = __VLS_2.slots;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ style: {} },
});
(props.title);
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "u-flex u-gap-2" },
    ...{ style: {} },
});
/** @type {[typeof Badge, typeof Badge, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(Badge, new Badge({
    tone: (__VLS_ctx.tone()),
}));
const __VLS_6 = __VLS_5({
    tone: (__VLS_ctx.tone()),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
const { default: __VLS_8 } = __VLS_7.slots;
// @ts-ignore
[tone,];
(props.status);
var __VLS_7;
/** @type {[typeof Badge, typeof Badge, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(Badge, new Badge({}));
const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const { default: __VLS_12 } = __VLS_11.slots;
(props.priority);
var __VLS_11;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "u-flex u-gap-2" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('toggle');
            // @ts-ignore
            [emit,];
        } },
    ...{ class: "btn btn-ghost" },
    title: "Toggle done",
});
const __VLS_13 = {}.CheckCircle2;
/** @type {[typeof __VLS_components.CheckCircle2, ]} */ ;
// @ts-ignore
CheckCircle2;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    size: (18),
}));
const __VLS_15 = __VLS_14({
    size: (18),
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('edit');
            // @ts-ignore
            [emit,];
        } },
    ...{ class: "btn btn-ghost" },
    title: "Edit",
});
const __VLS_18 = {}.Pencil;
/** @type {[typeof __VLS_components.Pencil, ]} */ ;
// @ts-ignore
Pencil;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    size: (18),
}));
const __VLS_20 = __VLS_19({
    size: (18),
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.emit('delete');
            // @ts-ignore
            [emit,];
        } },
    ...{ class: "btn btn-ghost" },
    title: "Delete",
});
const __VLS_23 = {}.Trash2;
/** @type {[typeof __VLS_components.Trash2, ]} */ ;
// @ts-ignore
Trash2;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    size: (18),
}));
const __VLS_25 = __VLS_24({
    size: (18),
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['u-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['u-gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['u-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['u-gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-ghost']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-ghost']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-ghost']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
