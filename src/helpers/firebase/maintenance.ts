import { onValue, get } from "firebase/database";
import { rdb } from "./firebaseConfig";

const CheckIsMaintenance = async () => {
    return new Promise((resolve) => {
        get(rdb) // Gunakan 'get' untuk membaca data sekali
            .then((snapshot) => {
                const value = snapshot.val();
                if (value && value.is_under_maintenance) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch((e) => {
                resolve(false);
            });
    });
};

const ListenIsMaintenance = (
    onMaintenance: (isMaintenance: boolean) => void,
    onMaintenaceOff: (isMaintenance: boolean) => void
) => {
    onValue(rdb, (snapshot) => {
        const value = snapshot.val();
        if (value && value.is_under_maintenance) {
            onMaintenance(true);
        } else {
            onMaintenaceOff(false);
        }
    });
};

export { CheckIsMaintenance, ListenIsMaintenance };
