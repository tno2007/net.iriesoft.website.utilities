// File: @/util/notify.ts
import { SetupContext } from '@vue/composition-api';

export function useNotify({ context, defaultTitle = 'Hey!' }: { context: SetupContext, defaultTitle?: string }) {
    const notifyError = (msg: string, title?: string) => {

        context.root.$bvToast.toast(msg, {
            title: title || defaultTitle,
            variant: 'danger',
        });
    };

    return {
        notifyError,
    };
}

export default useNotify;
