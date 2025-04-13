import moment from 'moment';

export const convertStringToDateTime = (dateString: string) => {
    const date = moment(dateString).format('DD/MM/YYYY HH:mm:ss A');
    return date;
};
